import React from 'react'
import { BrowserRouter as Router, Redirect } from 'react-router-dom'
import { UserRoutes, AlbumsRoutes } from "./Routes"
import './App.css'
import { useSelector } from 'react-redux'
import Nav from './Nav/Nav'

const App = props => {

  const userReducer = useSelector(state => state.user)

  return (
    <div className="App">
      <Router>
        {userReducer.currentUser?._id !== undefined ? <Nav /> : <Redirect to="/login" />}
        <UserRoutes />
        <AlbumsRoutes />
      </Router>
    </div>
  )
}

export default App


// const content_types = [
//   { _id: 1, _name: "Text" },
//   { _id: 2, _name: "Lyrics" },
//   { _id: 3, _name: "Image" },
//   { _id: 4, _name: "Audio" }
// ]
// const track_id = 1

// const [trackContent, setTrackContent] = useState([])

// const addContent = (e, type) => {
//   e.preventDefault()
//   const obj = {
//     _type_id: content_types.find(content => content._name === type)._id,
//     _track_id: track_id,
//     _content_text: "",
//     _content_file_path: ""
//   }
//   setTrackContent([...trackContent, obj])
// }

// const handleChange = (e, index) => {
//   const newCurrent = {...trackContent[index]}
//   if ([1, 2].includes(newCurrent._type_id)) newCurrent._content_text = e.target.value
//   else newCurrent.file = e.target.files[0]

//   let newContent = [...trackContent]
//     newContent[index] = newCurrent
//     setTrackContent(newContent)
// }

// const handleSubmit = e => {
//   e.preventDefault()

//   const data = new FormData()
//   let index = 0
//   for(const _item of trackContent) {
//     const item = {..._item}
//     if ([1, 2].includes(item._type_id)) {
//       data.append("item_"+index, JSON.stringify({...item, _index: index}))
//     } else {
//       const file = item.file
//       delete item.file
//       data.append("item_"+index, JSON.stringify({...item, _index: index}))
//       data.append("file_"+index, file)
//     }
//     index++
//   }

//   fetch("http://127.0.0.1:5000/api/content", {
//     method: 'POST',
//     body: data
//   })
//   .then(res => res.json())
//   .then(data => console.log(data))

// }

// return (
//   <div id="App">
//     {trackContent.map((cont, index) => (
//       cont._type_id === 1 ? <input value={trackContent[index]._content_text} onChange={e => handleChange(e, index)} type="text" /> :
//         cont._type_id === 2 ? <input value={trackContent[index]._content_text} onChange={e => handleChange(e, index)} type="text" /> :
//           cont._type_id === 3 ? <input onChange={e => handleChange(e, index)} type="file" /> :
//             <input onChange={e => handleChange(e, index)} type="file" />
//     ))}
//     <button onClick={e => addContent(e, "Text")}>Add Text</button>
//     <button onClick={e => addContent(e, "Lyrics")}>Add Lyrics</button>
//     <button onClick={e => addContent(e, "Image")}>Add Image</button>
//     <button onClick={e => addContent(e, "Audio")}>Add Audio</button>

//     <br/>
//     <button onClick={e => handleSubmit(e)}>Submit</button>
//   </div>
// )