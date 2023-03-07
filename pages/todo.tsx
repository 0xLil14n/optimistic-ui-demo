import { PrismaClient } from '@prisma/client';
import styles from '../styles/Home.module.css';

type ToDo = {
  itemName: string;
  isDone: boolean;
  id: string;
};

type Props = {
  toDos: ToDo[];
  listName: string;
};

const ToDo: React.FC<Props> = ({ toDos, listName }) => {
  console.log('todos', toDos);
  return (
    <div className={styles.main}>
      <h1 className={styles.title}>To Do List</h1>
      <fieldset>
        <legend>{listName}</legend>
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
            <label for={itemName}>{itemName}</label>
          </div>
        ))}
      </fieldset>
    </div>
  );
};

const prisma = new PrismaClient();
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
      listName: list?.name,
    },
  };
}
export default ToDo;
