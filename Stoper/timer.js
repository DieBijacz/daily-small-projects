export default class Timer {
    constructor(root) {
        root.innerHTML = Timer.getHTML()

        this.el = {
            min: root.querySelector(".timer-min"),
            sec: root.querySelector(".timer-sec"),
            control: root.querySelector(".btn-control"),
            reset: root.querySelector(".btn-reset")
        }
        
        //set to null to prevent time from running befor played to
        this.interval = null
        this.remainingSeconds = 0


        this.start()


        //LISTENER
        this.el.control.addEventListener("click", () => {
            if(this.interval === null) {
                this.start()
            } else {
                this.stop()
            }
        })
        this.el.reset.addEventListener("click", () => {
            const inputMin = prompt("Enter number of min")

            if(inputMin < 60) {
                this.stop()
                this.remainingSeconds = inputMin * 60
                this.updateInterfaceTime()
            }
        })
    }
    updateInterfaceTime() {
        const min = Math.floor(this.remainingSeconds / 60)
        const sec = this.remainingSeconds % 60
        //converts to string and add 0 if need to get 2digit output
        this.el.min.textContent = min.toString().padStart(2, "0")
        this.el.sec.textContent = sec.toString().padStart(2, "0")
    }
    updateInterfaceControl() {
        if ( this.interval === null){
            this.el.control.innerHTML = `<span class="material-icons">play_arrow</span>`
            this.el.control.classList.add("btn-start")
            this.el.control.classList.remove("btn-stop")
        } else {
            this.el.control.innerHTML = `<span class="material-icons">pause</span>`
            this.el.control.classList.add("btn-stop")
            this.el.control.classList.remove("btn-start")
        }
    }
    start() {
        if (this.remainingSeconds === 0) return
        
        //set interval to be executed every 1000ms
        this.interval = setInterval(() => {
            //this will be executed every 1s
            this.remainingSeconds--
            this.updateInterfaceTime()

            if (this.remainingSeconds === 0){
                this.stop()
            }
        }, 1000);
        //change control button
        this.updateInterfaceControl()
    }
    stop() {
        clearInterval(this.interval)

        this.interval = null
        this.updateInterfaceControl()
    }

    //add html when called in main.js
    static getHTML() {
        return `
            <span class="timer-part timer-min">00</span>
            <span class="timer-part">:</span>
            <span class="timer-part timer-sec">00</span>
            <button type="button" class="btn btn-control">
                <span class="material-icons">play_arrow</span>
            </button>
            <button type="button" class="btn btn-reset">
                <span class="material-icons">timer</span>
            </button>
        `
    }
    
}