import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Input from "./Input"
import Button from "./Button"
import { api } from "../api/api"
import { useItemStore } from "../store/useItemStore"

const CreateItem = () => {
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const { getItems } = useItemStore()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        const item = {
            title: e.target.title.value,
            description: e.target.description.value,
            price: Number(e.target.price.value),
        }
        if (e.target.imageUrl.value) item.imageUrl = e.target.imageUrl.value

        try {
            await api.sendItems(item)
            await getItems()
            navigate("/")
        } catch (err) {
            setError(err.response.data.error)
        }
    }

    return (
        <div className="container">
            <div className="page-header">
                <h1>Создать новый товар</h1>
            </div>

            <div className="form-container">
                {error.length > 0 && (
                    <div className="alert alert-error active">{error}</div>
                )}

                <form id="create-item-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">
                            Название товара <span className="required">*</span>
                        </label>
                        <Input
                            type="text"
                            className="form-input"
                            name="title"
                            placeholder="Например: iPhone 14 Pro 256GB"
                            maxLength="100"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            Описание <span className="required">*</span>
                        </label>
                        <textarea
                            className="form-textarea"
                            name="description"
                            placeholder="Подробно опишите товар, его состояние, характеристики..."
                            maxLength="1000"
                            required
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            Начальная цена <span className="required">*</span>
                        </label>
                        <div className="input-group">
                            <Input
                                type="number"
                                className="form-input with-prefix"
                                name="price"
                                placeholder="5000"
                                min="1"
                                step="100"
                                required
                            />
                            <span className="input-prefix">₽</span>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">URL изображения</label>
                        <Input
                            type="url"
                            className="form-input"
                            name="imageUrl"
                            placeholder="https://example.com/image.jpg"
                        />
                    </div>

                    <div className="form-actions">
                        <Link to="/" className="btn-cancel">
                            Отмена
                        </Link>
                        <Button type="submit" className="btn-submit">
                            Создать товар
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateItem