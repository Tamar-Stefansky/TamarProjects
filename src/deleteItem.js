import {MDDelet} from "react-icons/md"
import { Axios } from "axios"
const DeleteItem=({item})=>{
const handleDelete=async()=>{
    const {data:responseData} = await Axios.delete("http://localhost:2005/api/sport",{
        data:{id:sport._id}
    })
    console.log(responseData)
}

return(
    <div>
        <h2>{sport.code}</h2>
        <button onClick={handleDelete}className="delete-btn"><MDDelet/></button>
    </div>
    )
}
export default DeleteItem
