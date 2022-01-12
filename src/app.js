require("colors");

const { inquirerMenu, pause, readInput, deleteTasksList, confirm, markTaskList } = require("./helpers/inquirer");
const { saveFile, readFile } = require("./helpers/saveFile");
const Tasks = require("./models/tasks");

const tasks = new Tasks();
let option = "";

(async () => {
    do {
        option = await inquirerMenu();
        let tasksInfo = readFile();

        if (tasksInfo) {
            tasksInfo = JSON.parse(tasksInfo);
            tasks.loadTasksFromArr(tasksInfo);
        }

        switch (option) {
            case "1":
                const desc = await readInput("Description: ");
                tasks.createTask(desc);
                break;
            case "2":
                tasks.completeList();
                break;
            case "3":
                tasks.listCompletedTasks();
                break;
            case "4":
                tasks.listIncompletedTasks();
                break;
            case "5":
                const ids = await markTaskList(tasks.listArr);
                tasks.toggleCompleted(ids);
                break;
            case "6":
                const id = await deleteTasksList(tasks.listArr);

                if (id !== "0") {
                    const confirmDelete = await confirm("Are you sure that you want to delete this task?");

                    if (confirmDelete) {
                        tasks.deleteTask(id);
                        console.log("Task succesfully deleted.".red);
                    }
                };

                break;
        }

        saveFile(tasks.listArr);

        if (option !== "0") {
            await pause()
        };

    } while (option !== "0")
})();
