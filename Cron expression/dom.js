document.addEventListener("DOMContentLoaded", () => {
    const frequencySelect = document.getElementById("frequency");
    const dayDiv = document.getElementById("dayDiv");
    const weekDiv = document.getElementById("weekDiv");
    const monthDiv = document.getElementById("monthDiv");
    const dayHourSelect = document.getElementById("dayHour");
    const dayMinuteSelect = document.getElementById("dayMinute");
    const weekDayOfWeekSelect = document.getElementById("weekDayOfTheWeek");
    const weekHourSelect = document.getElementById("weekHour");
    const weekMinuteSelect = document.getElementById("weekMinute");
    const monthDayOfMonthSelect = document.getElementById("monthDayOfTheMonth");
    const monthHourSelect = document.getElementById("monthHour");
    const monthMinuteSelect = document.getElementById("monthMinute");

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    daysOfWeek.forEach((day) => {
        const option = document.createElement("option");
        option.text = day;
        weekDayOfWeekSelect.add(option.cloneNode(true));
    });

    for (let i = 0; i <= 24; i++) { 
        const option = document.createElement("option");
        option.text = i.toString();
        dayHourSelect.add(option.cloneNode(true));
        weekHourSelect.add(option.cloneNode(true));
        monthHourSelect.add(option.cloneNode(true));
    }

    for (let i = 0; i <= 59; i++) { 
        const option = document.createElement("option");
        option.text = i.toString();
        dayMinuteSelect.add(option.cloneNode(true));
        weekMinuteSelect.add(option.cloneNode(true));
        monthMinuteSelect.add(option.cloneNode(true));
    }

    function getDaySuffix(day) {
        if (day >= 11 && day <= 13) {
            return "th";
        }
        switch (day % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    }

    for (let i = 1; i <= 31; i++) {
        const option = document.createElement("option");
        option.text = i + getDaySuffix(i);
        monthDayOfMonthSelect.add(option.cloneNode(true));
    }

    frequencySelect.addEventListener("change", () => {
        const selectedFrequency = frequencySelect.value;
        if (selectedFrequency === "day") {
            dayDiv.style.display = "block";
            weekDiv.style.display = "none";
            monthDiv.style.display = "none";
        } else if (selectedFrequency === "week") {
            dayDiv.style.display = "none";
            weekDiv.style.display = "block";
            monthDiv.style.display = "none";
        } else if (selectedFrequency === "month") {
            dayDiv.style.display = "none";
            weekDiv.style.display = "none";
            monthDiv.style.display = "block";
        } else {
            dayDiv.style.display = "none";
            weekDiv.style.display = "none";
            monthDiv.style.display = "none";
        }
    });

   function calculateCronExpression() {
        const frequency = frequencySelect.value;
        const dayHour = dayHourSelect.value === "12" ? "0" : dayHourSelect.value;
        const dayMinute = dayMinuteSelect.value === "0" ? "0" : dayMinuteSelect.value;
        const weekDayOfWeek = weekDayOfWeekSelect.value;
        const weekHour = weekHourSelect.value === "12" ? "0" : weekHourSelect.value;
        const weekMinute = weekMinuteSelect.value === "0" ? "0" : weekMinuteSelect.value;
        const monthDayOfMonth = monthDayOfMonthSelect.value.replace(/\D/g, ''); 
        const monthHour = monthHourSelect.value === "12" ? "0" : monthHourSelect.value;
        const monthMinute = monthMinuteSelect.value === "0" ? "0" : monthMinuteSelect.value;

        let cronExpression = "";
        if (frequency === "day") {
            cronExpression = `${dayMinute} ${dayHour} * * *`;
        } else if (frequency === "week") {
            cronExpression = `${weekMinute} ${weekHour} * * ${weekDayOfWeek}`;
        } else if (frequency === "month") {
            cronExpression = `${monthMinute} ${monthHour} ${monthDayOfMonth} * *`;
        }


        const resultElement = document.getElementById("result");
        resultElement.textContent = cronExpression;
    }


    dayHourSelect.addEventListener("change", calculateCronExpression);
    dayMinuteSelect.addEventListener("change", calculateCronExpression);
    weekDayOfWeekSelect.addEventListener("change", calculateCronExpression);
    weekHourSelect.addEventListener("change", calculateCronExpression);
    weekMinuteSelect.addEventListener("change", calculateCronExpression);
    monthDayOfMonthSelect.addEventListener("change", calculateCronExpression);
    monthHourSelect.addEventListener("change", calculateCronExpression);
    monthMinuteSelect.addEventListener("change", calculateCronExpression);

    calculateCronExpression();
});
