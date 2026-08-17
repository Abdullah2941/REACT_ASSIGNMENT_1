import React, { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductGrid from '../components/ProductGrid.jsx'
import Reveal from '../components/Reveal.jsx'
import { products } from '../data/products.js'

const styles = ['all', 'casual', 'formal', 'party', 'gym']
const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
]

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()

  const styleParam = searchParams.get('style') || 'all'
  const searchParam = searchParams.get('search') || ''
  const saleOnly = searchParams.get('sale') === 'true'

  const [sort, setSort] = useState('featured')
  const [maxPrice, setMaxPrice] = useState(500)

  // Keep the visible search box in sync if the URL changes (e.g. navbar search).
  const [searchInput, setSearchInput] = useState(searchParam)
  useEffect(() => setSearchInput(searchParam), [searchParam])

  const setStyle = (style) => {
    const next = new URLSearchParams(searchParams)
    if (style === 'all') next.delete('style')
    else next.set('style', style)
    setSearchParams(next)
  }

  const toggleSale = () => {
    const next = new URLSearchParams(searchParams)
    if (saleOnly) next.delete('sale')
    else next.set('sale', 'true')
    setSearchParams(next)
  }

  const applySearch = (e) => {
    e.preventDefault()
    const next = new URLSearchParams(searchParams)
    if (searchInput.trim()) next.set('search', searchInput.trim())
    else next.delete('search')
    setSearchParams(next)
  }

  const filtered = useMemo(() => {
    let list = [...products]

    if (styleParam !== 'all') list = list.filter((p) => p.style === styleParam)
    if (saleOnly) list = list.filter((p) => p.oldPrice)
    if (searchParam) {
      const q = searchParam.toLowerCase()
      list = list.filter((p) => p.name.toLowerCase().includes(q))
    }
    list = list.filter((p) => p.price <= maxPrice)

    switch (sort) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        list.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        list.sort((a, b) => b.rating - a.rating)
        break
      default:
        break
    }

    return list
  }, [styleParam, saleOnly, searchParam, maxPrice, sort])

  return (
    <section className="section shop-page">
      <Reveal as="h1" className="section__heading">
        {searchParam ? `Results for "${searchParam}"` : 'ALL PRODUCTS'}
      </Reveal>

      <div className="shop-page__layout">
        <aside className="shop-filters">
          <form onSubmit={applySearch} className="shop-filters__search">
            <input
              type="search"
              placeholder="Search products..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button type="submit">Go</button>
          </form>

          <div className="shop-filters__group">
            <h4>Dress Style</h4>
            <ul>
              {styles.map((s) => (
                <li key={s}>
                  <button
                    type="button"
                    className={`filter-pill ${styleParam === s ? 'is-active' : ''}`}
                    onClick={() => setStyle(s)}
                  >
                    {s === 'all' ? 'All' : s[0].toUpperCase() + s.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="shop-filters__group">
            <h4>Max Price: ${maxPrice}</h4>
            <input
              type="range"
              min="50"
              max="500"
              step="10"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
          </div>

          <div className="shop-filters__group">
            <label className="filter-checkbox">
              <input type="checkbox" checked={saleOnly} onChange={toggleSale} />
              On sale only
            </label>
          </div>
        </aside>

        <div className="shop-page__results">
          <div className="shop-page__toolbar">
            <span>{filtered.length} products</span>
            <label>
              Sort by
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <ProductGrid products={filtered} />
        </div>
      </div>
    </section>
  )
}
