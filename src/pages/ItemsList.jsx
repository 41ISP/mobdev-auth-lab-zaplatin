import { useEffect, useState } from "react"
import ItemCard from "../components/ItemCard"
import { useItemStore } from "../store/useItemStore"
import { api } from "../api/api"

const ItemsList = () => {
    const { items, getItems } = useItemStore()
    const [stats, setStats] = useState(null)

    useEffect(() => {
        const load = async () => {
            getItems()
            try {
                const res = await api.getStats()
                setStats(res.data)
            } catch (error) {
                console.error(error)
            }
        }
        load()
    }, [])

    return (
        <div className="container">
            <div className="page-header">
                <h1>Все товары</h1>
            </div>

            <div className="stats">
                <div className="stat-item">
                    <span className="stat-value">{stats?.totalItems ?? 0}</span>
                    <span className="stat-label">Товаров</span>
                </div>

                <div className="stat-item">
                    <span className="stat-value">{stats?.totalBids ?? 0}</span>
                    <span className="stat-label">Ставок</span>
                </div>

                <div className="stat-item">
                    <span className="stat-value">{stats?.activeItems ?? 0}</span>
                    <span className="stat-label">Активных</span>
                </div>

                <div className="stat-item">
                    <span className="stat-value">{stats?.averageItemPrice ?? 0}₽</span>
                    <span className="stat-label">Средняя цена</span>
                </div>
            </div>

            <div className="items-grid">
                {items.map((item, i) => (
                    <ItemCard key={i} {...item} />
                ))}
            </div>
        </div>
    )
}

export default ItemsList