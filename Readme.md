# KanBan Board

### It is an complete todo app list with three progress list - todo , doing and done. Each one can have multiple tasks and on completion user can move the task from one list to another. They can also edit the task and delete them.

## 🌟 Features

### You can perform following functions:-

- Add and delete task
- Edit task
- Drag and drop task
- Arrange Task in any order
- Have access to number of task in each list at its title
- Switch to different theme modes
- Have those task stored in your browser for easy access.

## Implemented strategies

### Following functions/strategies have been implemented:-

- DragStart, dragOver and dragEnd function to help the task to be placed from one list to other
- updateTaskCount that helps you get total number of tasks in the list
- use of Local Storage to store task value in browser for easy access using loadTasksfromLocalStorage, saveTaskstoLocalStorage and updateLocalStorage function.
- ToggleTheme to change theme from one mode to other.
- getDragAfterElement allowing the task to move up or below to get it in specific priority.
- Algo explaination of getDragAfterElement method

  ![algo](/images/dragSortAlgo.png)

## Application View

### Light Mode

Here is the screenshot of application in light mode
![light](/images/LightMode.png)

### Dark Mode

Here is the screenshot of application in dark mode
![dark](/images/DarkMode.png)
