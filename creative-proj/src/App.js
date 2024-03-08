import './App.css';
import { useEffect, useRef, useState } from 'react';

import { collection, getDocs, doc, updateDoc, addDoc } from "firebase/firestore";
import { db } from './firebase';

function App() {

    let id = "";
    let ox = 0;
    let oy = 0;

    const mousePositionRef = useRef({
        x: 0,
        y: 0
    });

    const [docsData, setDocsData] = useState([]);

    useEffect(() => {
        const mouseMove = e => {
            mousePositionRef.current = {
                x: e.clientX,
                y: e.clientY
            };

            const cursor = document.getElementById('cursor');
            if (cursor) {
                cursor.style.top = `calc(${(mousePositionRef.current.y / window.innerHeight) * 100}% - 64px)`;
                cursor.style.left = `calc(${(mousePositionRef.current.x / window.innerWidth) * 100}% - 64px)`;
                cursor.style.backgroundPosition = `-${(mousePositionRef.current.x / window.innerWidth) * 100}% -${(mousePositionRef.current.y / window.innerHeight) * 100}%`;
                cursor.style.clipPath = `circle(64px at 64px 64px)`;
            }
        }

        window.addEventListener("mousemove", mouseMove);

        return () => {
            window.removeEventListener("mousemove", mouseMove);
        }
    }, []);

    useEffect(() => {

        const interval = setInterval(async () => {

            if (!id) {

                const docRef = await addDoc(collection(db, "part"), {
                    x: 0,
                    y: 0
                });
                id = docRef.id;
            } else if (mousePositionRef.current.x != ox || mousePositionRef.current.y != oy) {

                const ref = doc(db, "part", id);
                await updateDoc(ref, {
                    x: mousePositionRef.current.x,
                    y: mousePositionRef.current.y,
                });

                ox = mousePositionRef.current.x;
                oy = mousePositionRef.current.y;
            }

            const mice = collection(db, 'part');
            const miceSnapshot = await getDocs(mice);
            const data = [];
            miceSnapshot.forEach((doc) => {
                data.push(doc.data());
            });
            setDocsData(data);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    document.title = "Bad Indians";
    return (
        <div className="App">
            <div className="spotlight">
                {docsData.map((doc, index) => (
                    <div
                        key={index}
                        className='image-circle'
                        style={{
                            top: `calc(${(doc.y / window.innerHeight) * 100}% - 64px)`,
                            left: `calc(${(doc.x / window.innerWidth) * 100}% - 64px)`,
                            backgroundPosition: `-${(doc.x / window.innerWidth) * 100}% -${(doc.y / window.innerHeight) * 100}%`,
                            clipPath: `circle(64px at 64px 64px)`
                        }}
                    />
                ))}
            </div>
            <span className='image-circle' id='cursor'/>
        </div>
    );
}

export default App;
