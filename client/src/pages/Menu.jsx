import MenuItem from '../components/MenuItem'
import { useState, useEffect } from 'react'
import axios from 'axios'

const categoryOptions = [
  { value: 'all', label: 'Все' },
  { value: 'coffee', label: 'Кофе' },
  { value: 'desserts', label: 'Десерты' },
  { value: 'breakfast', label: 'Завтраки' },
  { value: 'books', label: 'Книги' }
]

const filterOptions = [
  { value: 'all', label: 'Все' },
  { value: 'vegan', label: 'Для веганов' },
  { value: 'lactose-free', label: 'Без лактозы' }
]

export default function Menu() {
  const [menuItems, setMenuItems] = useState([])
  const [category, setCategory] = useState('all')
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    axios.get('http://localhost:5000/api/menu')
      .then(res => setMenuItems(res.data))
      .catch(err => console.error(err))
  }, [])

 
  const filteredItems = menuItems.filter(item => 
    (category === 'all' || item.category === category) &&
    (filter === 'all' || item.tags.includes(filter))
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Меню</h1>
      
      {/* Фильтры */}
      <div className="flex flex-wrap justify-center space-x-4 mb-8">
        <select value={category} onChange={e => setCategory(e.target.value)} className="p-2 border rounded">
          {categoryOptions.map(cat => <option key={cat.value} value={cat.value}>{cat.label}</option>)}
        </select>
        <select value={filter} onChange={e => setFilter(e.target.value)} className="p-2 border rounded">
          {filterOptions.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
        </select>
      </div>

      {/* Элементы меню */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, idx) => (
            <MenuItem key={item.id || item._id || idx} item={item} />
          ))
        ) : (
          <div className="col-span-3 text-center text-gray-500 text-xl py-8">
            Нет блюд для выбранных фильтров
          </div>
        )}
      </div>
    </div>
  )
}