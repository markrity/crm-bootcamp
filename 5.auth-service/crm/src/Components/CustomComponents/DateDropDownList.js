import React from "react";
import DropdownDate from "react-dropdown-date";

const DateDropDownList = () => {


    const formatDate = date => {
        // formats a JS date to 'yyyy-mm-dd'
        var d = new Date(date),
            month = "" + (d.getMonth() + 1),
            day = "" + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;

        return [year, month, day].join("-");
    };

    return (
        <div>
            <DropdownDate
                onMonthChange={month => {
                    // optional
                    console.log(month);
                }}
                onYearChange={year => {
                    // optional
                    console.log(year);
                }}
                onDateChange={date => {
                    // optional
                    console.log(date);
                    this.setState({ date: date, selectedDate: formatDate(date) });
                }}
                defaultValues={
                    {
                        year: "select year",
                        month: "select month",
                    }
                }
            />
        </div>
    );
}



export default DateDropDownList