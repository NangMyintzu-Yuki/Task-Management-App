import { List, ListItem, ListItemText } from '@mui/material';

const TaskList = ({ tasks }) => {
  return (
    <List>
      {tasks.map((task) => (
        <ListItem key={task.id}>
          <ListItemText primary={task.title} />
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList;
