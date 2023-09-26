import { useState, useEffect } from 'react';
import './App.css';

import { RiDeleteBin6Line, RiCheckLine } from 'react-icons/ri';

// Get Todo List From LocalStorage
function GetStoredItem() 
{
  if(localStorage.getItem('TodoItems'))
  {
    const items = localStorage.getItem('TodoItems');
    const data = JSON.parse(items);
    return data;
  }
  return [];
} 

export default function App() 
{
  const [Items, setItems] = useState(GetStoredItem());
  const [Title, setTitle] = useState('');
  const [checkItem, setCheckItem] = useState([false]);

  // Add To Do Item
  const AddTodo = () => {
    if(Title.length < 1) { return; }
    setItems([...Items, Title]);
  }

  // Handle For Task Deletion
  const DeleteTask = (i) => {
    const updatedArrayItem = Items.filter((element, index) => {
      return index != i;
    })

    setItems(updatedArrayItem);
  }

  // Remove All The Todo
  const RemoveAll = () => { 
    setItems([]); 
  }

  // Save Data In LocalStorage
  useEffect(() => {
    localStorage.setItem("TodoItems", JSON.stringify(Items));
  }, [Items]);
  

  const handleKeyDown = (event) => { if (event.key === 'Enter') { AddTodo(); } };

  return (
    <div>

      <section className='flex flex-col h-screen'>

        <h1 className='text-center text-white text-5xl mt-10 font-light'>TO DO APP</h1>

        <figure className='flex flex-row items-center justify-center w-full m-auto mt-5 mb-5'>
          <input onChange={(e) => setTitle(e.target.value)} onKeyDown={handleKeyDown} className='w-1/3 h-[40px] bg-zinc-900 hover:bg-zinc-800 rounded-lg text-zinc-400 selection:text-black selection:bg-white text-center font-bold'/>
          <button onClick={() => AddTodo()}  className='w-14 h-[40px] ml-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg select-none text-white text-center text-1xl'>➕</button>
          <button onClick={RemoveAll}  className='w-1/12 h-[40px] ml-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg select-none text-white text-center text-1xl'>Delete All</button>
        </figure>
        
        <ul className='bg-teal-500 w-10/12 h-auto p-2 m-auto mt-5 mb-5 rounded-lg'>
          {
            Items.map((itemsData, index) => (
              <div key={index} className='flex flex-row justify-between items-center rounded-lg bg-zinc-950 hover:bg-zinc-900 drop-shadow-md shadow-black shadow-md  w-[95%] h-auto p-1 m-auto mt-5 mb-5'>
                <RiCheckLine className={`text-green-400 scale-[1.5] ml-4`}/>
                <p className='text-center text-white font-semibold ml-5'> {itemsData}</p>
                <button id={index} onClick={() => DeleteTask(index) } className='h-full text-zinc-600 hover:text-red-600 transition-colors duration-300 text-2xl cursor-default p-2'><RiDeleteBin6Line/></button>
              </div>
            ))
          }
        </ul>
      
      </section>

    </div>
  );
}
