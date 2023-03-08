import { PrismaClient } from '@prisma/client';
import { BaseSyntheticEvent } from 'react';
import styles from '../styles/Home.module.css';

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
  return (
    <div className={styles.main}>
      <h1 className={styles.title}>To Do List</h1>
      <fieldset>
        <legend>{list?.name}</legend>
        {toDos.map(({ isDone, itemName }) => (
          <div className={styles.toDoItem}>
            <input
              type="checkbox"
              onChange={() => {}}
              checked={isDone}
              value={itemName}
              name={itemName}
              id={itemName}
            />
            <label htmlFor={itemName}>{itemName}</label>
          </div>
        ))}
        <form
          onSubmit={async (e: BaseSyntheticEvent) => {
            console.log('e', e);

            e.preventDefault();
            try {
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
            onSubmit={(e) => {
              console.log('asdfe', e.target);
              e.preventDefault();
            }}
            name="add to-do item"
            placeholder="add to-do item"
          />
          <input type="submit" style={{ display: 'none' }} />
        </form>
      </fieldset>
    </div>
  );
};

const prisma = new PrismaClient();

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
