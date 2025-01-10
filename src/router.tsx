import { lazy, Suspense } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layouts from "./layouts/Layouts.tsx"
const IndexPage = lazy(() => import('./views/IndexPage'))
const FavoritesPage = lazy(() => import('./views/FavoritesPage'))

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layouts />}>
                    <Route path='/' element={
                        <Suspense fallback="Cargando...">
                            <IndexPage/>
                        </Suspense>
                    } index />
                    <Route path='/favoritos' element={
                        <Suspense fallback="Cargando...">
                            <FavoritesPage/>
                        </Suspense>
                    } />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}