var currentOffset = 0,
    isSynced = true,
    yPos = null;

const staginglocationTexts = document.getElementsByClassName('stage'),
    hourTexts = document.getElementsByClassName('time'),
    formatHour = hour => {
        return hour >= 12 ? (hour - 1) % 12 + 1 + 'PM' : hour + 'AM';
    },
    getCurrentTime = () => {
        const time = new Date(),
            hour = time.getHours() + ~~(time.getMinutes() / 30);

        // very sophisticated, I know.

        if (hour < 9) {
            return 9;
        } else if (hour < 11) {
            return 11;
        } else if (hour < 13) {
            return 13;
        } else if (hour < 15) {
            return 15;
        } else if (hour < 17) {
            return 17;
        } else if (hour < 19) {
            return 19;
        }

        return 7;
    },
    getStagingLocation = hour => {
        const remainder = hour % 4;

        switch (remainder) {
            case 0:
                return 'D';
            case 1:
                return 'A';
            case 2:
                return 'C';
            case 3:
                return 'B';
        }
    },
    getTouches = e => {
        return e.touches || e.originalEvent.touches;
    },
    startTouches = e => {
        const ogPosition = getTouches(e)[0];

        yPos = ogPosition.clientY;

        console.log(ogPosition)
    },
    updatePage = (offset = 0) => {
        const selectedTime = getCurrentTime();

        currentOffset += offset;

        staginglocationTexts[0].innerHTML = `<span class="yellow">${formatHour(selectedTime + currentOffset)}</span>s`;
        hourTexts[0].innerHTML = `to <span class="yellow">${getStagingLocation(selectedTime + currentOffset)}</span>`;

        staginglocationTexts[1].innerHTML = `<span class="orange">${formatHour(selectedTime + currentOffset + 1)}</span>s`;
        hourTexts[1].innerHTML = `to <span class="orange">${getStagingLocation(selectedTime + currentOffset + 1)}</span>`;
    },
    updateTouches = e => {
        if (!yPos)
            return;

        const yDiff = yPos - e.changedTouches[0].clientY;

        if (yDiff > -20 && yDiff < 20) {
            // tap
            isSynced = true;
            currentOffset = 0;
            updatePage();
        } else if (yDiff > 0) {
            // swiped up
            isSynced = false;
            updatePage(-1);
        } else {
            // swiped down
            isSynced = false;
            updatePage(1);
        }
    };

updatePage();
setInterval(() => {
    if (isSynced)
        updatePage();
}, 1000);

document.addEventListener('touchstart', startTouches, false);
document.addEventListener('touchend', updateTouches, false);