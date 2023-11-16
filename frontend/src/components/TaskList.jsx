import React, { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Container,
  DialogContent,
  Dialog,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import TaskService from "../services/task-data-service";

const TaskList = ({ calendarValue }) => {
  const [tasks, setTasks] = useState([]);
  const [selectedPriority, setSelectedPriority] = useState("All");
  const [openDialog, setOpenDialog] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskDate, setNewTaskDate] = useState(dayjs());

  const taskService = new TaskService();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    taskService
      .getTasks()
      .then((response) => {
        setTasks(response.data);
        console.log("Getting tasks successful");
      })
      .catch((error) => {
        console.error("Failed getting tasks", error);
      });
  };

  const filterTasksByPriorityAndDate = () => {
    const tasksFilteredByDate = tasks.filter((task) =>
      dayjs(task.dueDate).isSame(formatDate(calendarValue), "day")
    );

    if (selectedPriority === "All") {
      return tasks;
    }

    if (selectedPriority === "AllForTheDay") {
      return tasksFilteredByDate;
    }

    console.log("filtered tasks by date:", calendarValue);

    const filteredTasks = tasksFilteredByDate.filter(
      (task) => task.priority === selectedPriority
    );

    console.log("Filtered tasks:", filteredTasks);

    return filteredTasks;
  };

  const formatDate = (date) => {
    const { $d: finalDate } = date;
    const parsedDate = dayjs(finalDate); // Parse the string into a Day.js object
    return parsedDate.toISOString(); // Format as desired
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCompletionToggle = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );

    const taskToUpdate = tasks.find((task) => task.id === taskId);
    if (taskToUpdate) {
      taskService
        .updateTask(taskToUpdate)
        .then((response) => {
          console.log("Updating data successful", response.data);
        })
        .catch((error) => {
          console.log("Failed updating task", error);
        });
    }
  };

  const handleUpdateTaskDate = (task, date) => {
    task.dueDate = date;

    taskService
      .updateTask(task)
      .then((response) => {
        console.log("Updated task date: " + task.title);
      })
      .catch((error) => {
        console.error("Task date update failed: ", error);
      });
  };

  const handleAddTask = () => {
    const newTask = {
      title: newTaskName,
      description: "nowy task",
      priority: selectedPriority,
      dueDate: newTaskDate,
      completed: false,
    };

    taskService
      .addTask(newTask)
      .then((response) => {
        console.log("Task added successfully:", response.data);
        setTasks((prevTasks) => [...prevTasks, response.data]);
      })
      .catch((error) => {
        console.error("Error adding task:", error);
      });

    // setTasks((prevTasks) => [...prevTasks, newTask]);
    setNewTaskName(""); // Clear input after adding task
    setSelectedPriority("Low"); // Reset priority
    setNewTaskDate(dayjs()); // Reset date
    handleCloseDialog();
  };

  const handleRemoveTask = (taskId) => {
    const newList = tasks.filter((item) => item.id !== taskId);
    setTasks(newList);

    taskService
      .deleteTaskById(taskId)
      .then((response) => {
        console.log("Task deleted successfully", response.data);
      })
      .catch((error) => {
        console.error("Error deleting task", error);
      });
  };

  const handlePriorityChange = (taskId, priority) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, priority } : task
      )
    );
  };

  return (
    <Grid item xs={12} md={8} lg={9}>
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          height: "620px",
        }}
      >
        <FormControl sx={{ marginBottom: 2 }}>
          <InputLabel htmlFor="filter">Filter</InputLabel>
          <Select
            value={selectedPriority}
            label="Filter by Priority"
            onChange={(e) => setSelectedPriority(e.target.value)}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="AllForTheDay">All for the day </MenuItem>
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </Select>
        </FormControl>
        <Container
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            maxHeight: "1000px",
            overflow: "auto",
          }}
        >
          <List>
            {filterTasksByPriorityAndDate().map((task) => (
              <ListItem
                key={task.id}
                style={{
                  margin: "8px 0",
                  padding: "16px",
                  borderBottom: "1px solid #ccc",
                }}
              >
                <Checkbox
                  checked={task.completed}
                  onChange={() => handleCompletionToggle(task.id)}
                  style={{ marginRight: "16px" }}
                />
                <ListItemText
                  primary={task.title}
                  secondary={`Priority: ${task.priority}`}
                  style={{ flex: 1, marginRight: "16px" }}
                />
                <DateTimePicker
                  label="Date"
                  value={dayjs(task.dueDate)}
                  style={{ marginRight: "16px" }}
                  onAccept={(date) => {
                    handleUpdateTaskDate(task, formatDate(date));
                  }}
                />
                <FormControl style={{ minWidth: "120px", marginRight: "16px" }}>
                  <InputLabel htmlFor={`priority-${task.id}`}>
                    Priority
                  </InputLabel>
                  <Select
                    value={task.priority}
                    label={`Priority ${task.id}`}
                    onChange={(e) =>
                      handlePriorityChange(task.id, e.target.value)
                    }
                  >
                    <MenuItem value="Low">Low</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="High">High</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  onClick={() => {
                    handleRemoveTask(task.id);
                  }}
                  variant="outlined"
                  style={{ marginLeft: "8px" }}
                  label="Delete"
                >
                  <DeleteIcon />
                </Button>
              </ListItem>
            ))}
          </List>
        </Container>

        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            handleOpenDialog();
            console.log("add button click");
          }}
          style={{ marginTop: "auto" }}
        >
          Add Task
        </Button>

        <Dialog
          open={openDialog}
          onClose={() => {
            handleCloseDialog();
          }}
        >
          <DialogTitle>
            Add New Task
            <IconButton
              edge="end"
              color="inherit"
              onClick={() => handleCloseDialog()}
              aria-label="close"
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TextField
              label="Task Name"
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
              fullWidth
              style={{ marginBottom: "16px", width: "80%" }}
            />
            <FormControl
              fullWidth
              style={{ marginBottom: "16px", width: "80%" }}
              id="newTaskPrioForm"
            >
              <InputLabel htmlFor="new-task-priority">Priority</InputLabel>
              <Select
                value={selectedPriority}
                label="Priority"
                onChange={(e) => setSelectedPriority(e.target.value)}
              >
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
              </Select>
            </FormControl>
            <DateTimePicker
              label="Task Date"
              value={newTaskDate}
              onChange={(date) => setNewTaskDate(date)}
              style={{ marginBottom: "16px", width: "80%" }}
            />
            <div style={{ width: "80%" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  handleAddTask();
                  console.log("adding task");
                }}
                fullWidth
              >
                Add Task
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </Paper>
    </Grid>
  );
};

export default TaskList;
