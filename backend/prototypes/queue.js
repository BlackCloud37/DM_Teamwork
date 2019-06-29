/*
* function QueueElement(element, priority) {
        this.element = element;
        this.priority = priority;
    }
* */

function priorityQueue(QueueElement,cmp) {
    let items = [];

    this.push = function (element, priority) {
        let queueElement = new QueueElement(element, priority);

        let added = false;
        for (let i = 0; i < items.length; i++) {
            if (cmp(queueElement.priority,items[i].priority)) {
                items.splice(i, 0, queueElement);
                added = true;
                break;
            }
        }
        if (!added) {
            items.push(queueElement);
        }
    }
    this.print = function () {
        for(let i = 0; i < items.length; i ++){
            console.log(items[i].element +"  -  "+items[i].priority);
        }
    }
    //其他实现与队列相同
    //删除
    this.pop = function (el) {
        return items.shift();
    }
    //查看队列头元素
    this.front = function () {
        return items[0];
    }
    //检查是否为空
    this.isEmpty = function () {
        return items.length === 0;
    }
    this.length = function () {
        return items.length;
    }

}

module.exports = priorityQueue;