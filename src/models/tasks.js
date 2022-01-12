const Task = require("./task");

class Tasks {
    _listado = {};

    // Getters

    get listArr() {
        const list = [];

        Object.keys(this._listado).forEach((key) => {
            list.push(this._listado[key]);
        });

        return list;
    }

    constructor() {
        this._listado = {};
    }

    // Methods

    deleteTask(id = "") {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    createTask(desc = "") {
        const task = new Task(desc);

        this._listado[task.id] = task;
    }

    loadTasksFromArr(tasksInfo = []) {
        tasksInfo.forEach(task => {
            this._listado[task.id] = task;
        });
    }

    completeList() {
        const tasksList = this.listArr;
        console.log();

        tasksList.forEach((task, i) => {
            let index = i + 1;

            if (task.completedAt) {
                console.log(`${index} - ${task.description} :: Completed`.green);
            } else {
                console.log(`${index} - ${task.description} :: Incompleted`.red);
            }
        })
    }

    listCompletedTasks() {
        const tasksList = this.listArr;
        let index = 0;
        console.log();

        tasksList.forEach(task => {

            if (task.completedAt) {
                index += 1;
                console.log(`${index} - ${task.description} :: Completed`.green);
            };
        })
    }

    listIncompletedTasks() {
        const tasksList = this.listArr;
        let index = 0;
        console.log();

        tasksList.forEach((task, i) => {
            if (!task.completedAt) {
                index += 1;
                console.log(`${index} - ${task.description} :: Incompleted`.red);
            };
        });
    }

    toggleCompleted(ids = []) {
        ids.forEach(id => {
            const task = this._listado[id];

            if (!task.completedAt) {
                task.completedAt = new Date().toISOString()
            };
        });

        this.listArr.forEach(task => {
            if (!ids.includes(task.id)) {
                task.completedAt = null;
            };
        });
    }
};

module.exports = Tasks;
