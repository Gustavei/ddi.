import { useState, useCallback } from 'react';

export const useSearch = (items: any[]) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useCallback(() => {
    if (!searchQuery.trim()) return items;
    
    return items.filter((item) => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [items, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filteredItems: filteredItems()
  };
};