class DOMManager
{
    constructor () {
        this.timerNewGeneration = document.getElementById('timer-new-generation')
        this.timerNewGenerationWithRerender = document.getElementById('timer-new-generation-with-rerender')
        this.btnAbout = document.getElementById('btn-about')
        this.blockAbout = document.getElementById('block-about')

        this.setHandlers()
    }

    setHandlers = () => {
        this.btnAbout.addEventListener('click', () => this.showAboutBlock())
    }

    showTimeToNewGeneration = (time) => {
        this.timerNewGeneration.textContent = time
    }

    showTimeToNewGenerationWithRerender = (time) => {
        this.timerNewGenerationWithRerender.textContent = time
    }

    showAboutBlock = () => {
        this.blockAbout.classList.toggle('active')
    }
}