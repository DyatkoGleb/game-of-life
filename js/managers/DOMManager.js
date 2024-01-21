class DOMManager
{
    showTimeToNewGeneration = (time) => {
        document.getElementById('timer-new-generation').textContent = time
    }

    showTimeToNewGenerationWithRerender = (time) => {
        document.getElementById('timer-new-generation-with-rerender').textContent = time
    }
}