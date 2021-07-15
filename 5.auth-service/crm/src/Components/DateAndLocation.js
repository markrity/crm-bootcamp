import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import CustomMonthlyCalendar from './CustomMonthlyCalendar'
import { getHalls } from '../actions/buisness'

const DateAndLocation = () => {
    const dispatch = useDispatch()

    return (
        <div className="flex-col full-height">
            <h1>Date And Location</h1>
            <CustomMonthlyCalendar />
        </div>

    )
}

export default DateAndLocation