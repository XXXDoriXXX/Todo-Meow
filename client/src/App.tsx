import {useEffect, useState} from "react";

   const App = () => {
       const [message, setMessage] = useState<string>('Loading...');

       useEffect(() => {
           fetch('/api')
               .then((res)=>res.text())
               .then((data)=>setMessage(data))
               .catch(()=>setMessage('Error'));
           },[]);
       return(
           <div className="min-h-screen flex item-center justify-center bg-gray-100">
               <h1 className="text-3xl front-bold text-blue-600">{message}</h1>
           </div>
       );
   }

export default App;