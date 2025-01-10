import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Modal from "../components/Modal"
import { useEffect } from "react"
import { useAppStore } from "../stores/useAppStore"

export default function Layouts() {
    const loadFromStorage = useAppStore((state) => state.loadFromStorage)
    useEffect(() => {
      loadFromStorage()  
    }, [])

    return (
        <>
            <Header />
            
            <main className="container mx-auto py-16 bg-fondo">
                <Outlet />
            </main>

            <Modal />
        </>
    )
}