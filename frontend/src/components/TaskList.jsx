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
import createTaskService from "../services/TaskService";

const TaskList = ({
  calendarValue,
  refetchTasks,
  setRefetchTasks,
  tasksStats,
  setTasksStats,
  isLoggedIn,
  tasks,
  setTasks,
}) => {
  const [selectedFilterPriority, setSelectedFilterPriority] = useState("All");
  const [openDialog, setOpenDialog] = useState(false);
  const [newTaskPriority, setNewTaskPriority] = useState("Low");
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskDate, setNewTaskDate] = useState(calendarValue);

  useEffect(() => {
    if (isLoggedIn) {
      fetchTasks();
    } else {
      setTasks([]);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    setNewTaskDate(calendarValue);
    calculateTasksStats();
  }, [calendarValue]);

  useEffect(() => {
    calculateTasksStats();
  }, [tasks]);

  useEffect(() => {
    fetchTasks();
    setRefetchTasks(false);
  }, [refetchTasks, setRefetchTasks]);

  const fetchTasks = () => {
    const taskService = createTaskService();
    const token = taskService.getAccessToken();
    if (token) {
      console.log("Fetching data with token: " + token);

      taskService
        .getTasks()
        .then((response) => {
          setTasks(response.data);
          console.log("Getting tasks successful", response);
        })
        .catch((error) => {
          setTasks([]);
          console.error("Failed getting tasks", error);
        });
    } else {
      console.log("Missing token...");
    }
  };

  const calculateTasksStats = () => {
    let countCompletedTasks = 0;
    let countAllCompletedTasks = 0;
    let countTasks = 0;
    let countAllTasks = 0;
    const tasksFilteredByCalendarDate = filterTasksByCalendarDate();

    tasksFilteredByCalendarDate.forEach((task) => {
      if (task.completed) {
        countCompletedTasks++;
      }
      countTasks++;
    });

    tasks.forEach((task) => {
      if (task.completed) {
        countAllCompletedTasks++;
      }
      countAllTasks++;
    });
    const dayStats =
      countTasks > 0 ? (countCompletedTasks / countTasks) * 100 : 100;
    const allStats =
      countAllTasks > 0 ? (countAllCompletedTasks / countAllTasks) * 100 : 100;

    setTasksStats({
      dayStats: dayStats,
      allStats: allStats,
    });
  };

  const filterTasksByCalendarDate = () => {
    return tasks.filter((task) =>
      dayjs(task.dueDate).isSame(formatDate(calendarValue), "day")
    );
  };

  const filterTasksByPriorityAndDate = () => {
    const tasksFilteredByCalendarDate = filterTasksByCalendarDate();

    if (selectedFilterPriority === "All") {
      return tasks;
    }

    if (selectedFilterPriority === "AllForTheDay") {
      return tasksFilteredByCalendarDate;
    }

    console.log("filtered tasks by date:", calendarValue);

    const filteredTasks = tasksFilteredByCalendarDate.filter(
      (task) => task.priority === selectedFilterPriority
    );

    console.log("Filtered tasks:", filteredTasks);

    return filteredTasks;
  };

  const formatDate = (date) => {
    const { $d: finalDate } = date;
    const parsedDate = dayjs(finalDate);
    return parsedDate.toISOString();
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleUpdateCompletion = (task) => {
    const taskService = createTaskService();
    const token = taskService.getAccessToken();

    if (task && token) {
      task.completed = !task.completed;

      taskService
        .updateTask(task)
        .then((response) => {
          console.log("Updating task completion successful", response.data);
          const alteredTask = tasks.map((item) =>
            item.id === response.data.id ? response.data : item
          );
          setTasks(alteredTask);
        })
        .catch((error) => {
          console.error("Failed updating task completion", error);
        });
    } else {
      console.error(
        "Error with task passed to task completion update / missing token"
      );
    }
  };

  const handleUpdateTaskDate = (task, date) => {
    const taskService = createTaskService();
    const token = taskService.getAccessToken();

    if (task && token) {
      task.dueDate = date;

      taskService
        .updateTask(task)
        .then((response) => {
          console.log("Updated task date", response.data);
        })
        .catch((error) => {
          console.error("Failed updating task date", error);
        });
    }
  };

  const handleUpdatePriority = (task, priority) => {
    const taskService = createTaskService();
    const token = taskService.getAccessToken();

    if (task && token) {
      task.priority = priority;
      console.log(task);
      taskService
        .updateTask(task)
        .then((response) => {
          console.log("Updated task priority", response.data);
          const alteredTask = tasks.map((item) =>
            item.id === response.data.id ? response.data : item
          );
          setTasks(alteredTask);
        })
        .catch((error) => {
          console.error("Failed updating task priority", error);
        });
    } else {
      console.error(
        "Error with task passed to task priority update / missing token"
      );
    }
  };

  const handleAddTask = () => {
    const taskService = createTaskService();
    const token = taskService.getAccessToken();

    if (token) {
      const newTask = {
        title: newTaskName,
        priority: newTaskPriority,
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

      setNewTaskName("");
      setNewTaskPriority("Low");
      setNewTaskDate(dayjs());
      handleCloseDialog();
    }
  };

  const handleRemoveTask = (task) => {
    const taskService = createTaskService();
    const token = taskService.getAccessToken();

    if (token) {
      taskService
        .deleteTaskById(task.id)
        .then((response) => {
          console.log("Task deleted successfully", response.data);
          const newList = tasks.filter((item) => item.id !== task.id);
          setTasks(newList);
        })
        .catch((error) => {
          console.error("Failed task deletion", error);
        });
    } else {
      console.log("Missing token...");
      return null;
    }
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
            value={selectedFilterPriority}
            label="Filter by Priority"
            onChange={(e) => setSelectedFilterPriority(e.target.value)}
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
                  label="defaultChecked"
                  checked={task.completed}
                  onChange={() => handleUpdateCompletion(task)}
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
                    onChange={(e) => handleUpdatePriority(task, e.target.value)}
                  >
                    <MenuItem value="Low">Low</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="High">High</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  onClick={() => {
                    handleRemoveTask(task);
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
                value={newTaskPriority}
                label="Priority"
                onChange={(e) => setNewTaskPriority(e.target.value)}
              >
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
              </Select>
            </FormControl>
            <DateTimePicker
              label="Task Date"
              defaultValue={calendarValue}
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
