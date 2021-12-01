const staginglocationTexts = document.getElementsByClassName('stage'),
    hourTexts = document.getElementsByClassName('time'),
    getCurrentTime = () => {
        const time = new Date(),
            hour = time.getHours() + ~~(time.getMinutes() / 30);

        // very sophisticated, I know.

        if (hour < 6) {
            return 8;
        } else if (hour < 8) {
            return 10;
        } else if (hour < 10) {
            return 12;
        } else if (hour < 12) {
            return 14;
        } else if (hour < 14) {
            return 16;
        } else if (hour < 16) {
            return 18;
        }

        return 6;
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
    formatHour = hour => {
        return hour >= 12 ? hour + 'PM' : hour + 'AM';
    },
    updatePage = () => {
        const selectedTime = getCurrentTime();

        staginglocationTexts[0].innerHTML = `<span class="yellow">${formatHour(selectedTime)}</span>s`;
        hourTexts[0].innerHTML = `to <span class="yellow">${getStagingLocation(selectedTime)}</span>`;

        staginglocationTexts[1].innerHTML = `<span class="orange">${formatHour(selectedTime + 1)}</span>s`;
        hourTexts[1].innerHTML = `to <span class="orange">${getStagingLocation(selectedTime + 1)}</span>`;
    };

updatePage();
setInterval(updatePage, 1000);