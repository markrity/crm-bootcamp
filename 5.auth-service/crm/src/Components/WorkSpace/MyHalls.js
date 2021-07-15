import React from 'react'
import { getHallsInformation } from '../../actions/buisness'

const MyHalls = () => {

    const [isAddVisible, setIsAddVisible] = useState(false)
    const [deleteModalVisible, setDelModalVisible] = useState(false)
    const [isEditVisible, setIsEditVisible] = useState(false)
    const [userId, setUserId] = useState(0)
    const [userFields, setUserFields] = useState({})
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getHallsInformation())
    }, []);

    const addEmployeeBtn = () => {
        return (
            <button id="change-padding-undo-margin-bottom" onClick={() => setIsAddVisible(true)}> Add Employee</button >
        )
    }


    const columns = useMemo(
        () => [
            {
                Header: "Hall Name",
                accessor: "Name",

            },
            {
                Header: "Capacity",
                accessor: "Capacity",
            },
            {
                Header: "Price",
                accessor: "Price",
            },
            {
                Header: addEmployeeBtn(),
                accessor: "id",
                Cell: ({ row }) => <div className="flex-row spaced-between">
                    <BsFillTrashFill id="clickable" size={20} onClick={() => {
                        setUserId(row.original.id)
                        setDelModalVisible(true)
                    }} />
                    <FaPencilAlt id="clickable" size={20} onClick={() => {
                        setUserId(row.original.id)
                        setUserFields(row.original)
                        setIsEditVisible(true)
                    }} />
                </div>
            }
        ],
        []
    )

    return (
        <>
            <Table columns={columns} data={employees} />
        </>

    )

}

export default MyHalls