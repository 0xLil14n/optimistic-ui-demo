import { PrismaClient } from '@prisma/client';
import { BaseSyntheticEvent, useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import todolist from './api/todolist';

type ToDo = {
  itemName: string;
  isDone: boolean;
  id: string;
  toDoList: any;
};

type Props = {
  toDos: ToDo[];
  list: any;
};

const ToDo: React.FC<Props> = ({ toDos, list }) => {
  const [toDoItems, setToDoItems] = useState<ToDo[]>([]);
  useEffect(() => {
    setToDoItems([...toDos]);
  }, []);
  return (
    <div className={styles.main}>
      <h1 className={styles.title}>To Do List</h1>
      <div className={styles.content}>
        <fieldset>
          <legend>{list?.name}</legend>
          {toDoItems
            .filter(({ isDone }) => !isDone)
            .map(({ id, isDone, itemName }) => (
              <div className={styles.toDoItem}>
                <button
                  onClick={() => {
                    setToDoItems((toDoItems) => {
                      return toDoItems.reduce(
                        (acc, curr) =>
                          curr.id === id
                            ? [...acc, { ...curr, isDone: !isDone }]
                            : [...acc, curr],
                        [] as ToDo[]
                      );
                    });
                    updateToDoItem({ id, isDone: !isDone });
                  }}
                  type="button"
                  className={styles.removeButton}
                >
                  remove
                </button>

                <label htmlFor={itemName}>{itemName}</label>
              </div>
            ))}
          <form
            onSubmit={async (e: BaseSyntheticEvent) => {
              console.log('e', e);

              e.preventDefault();
              try {
                setToDoItems([
                  ...toDoItems,
                  { itemName: e.target[0].value, isDone: false } as ToDo,
                ]);
                await saveToDoItem({
                  itemName: e.target[0].value,
                  isDone: false,
                  toDoList: { connect: { id: '1' } },
                });
                e.target.reset();
              } catch (err) {
                console.log(err);
              }
            }}
          >
            <input
              className={styles.addItem}
              name="add to-do item"
              placeholder="add to-do item"
            />
            <input type="submit" style={{ display: 'none' }} />
          </form>
        </fieldset>
        <fieldset>
          <legend>done</legend>
          {toDoItems
            .filter(({ isDone }) => isDone)
            .map(({ id, isDone, itemName }) => (
              <div className={styles.toDoItem}>
                <button
                  onClick={() => {
                    updateToDoItem({ id, isDone: !isDone });
                  }}
                  type="button"
                  className={styles.removeButton}
                >
                  remove
                </button>

                <label htmlFor={itemName}>{itemName}</label>
              </div>
            ))}
        </fieldset>
      </div>
    </div>
  );
};

const prisma = new PrismaClient();

async function updateToDoItem(toDo: { id: string; isDone: boolean }) {
  const response = await fetch('/api/removeItem', {
    method: 'POST',
    body: JSON.stringify(toDo),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}

async function saveToDoItem(toDo: Omit<ToDo, 'id'>) {
  const response = await fetch('/api/todolist', {
    method: 'POST',
    body: JSON.stringify(toDo),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}

export async function getServerSideProps() {
  const list = await prisma.toDoList.findFirst();

  const toDos = await prisma.toDoList
    .findUnique({
      where: { id: list?.id },
    })
    .toDos();
  return {
    props: {
      toDos,
      list,
    },
  };
}
export default ToDo;
