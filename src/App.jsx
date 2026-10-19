import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
const App = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newItemName, setNewItemName] = useState('');
  const [newItemDescription, setNewItemDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getItems();
  }, [])

async function getItems() {
  try {
    setLoading(true);
    const {data, error} = await supabase
      .from('items')
      .select('*');

    if(error){
      throw error;
    }
    setItems(data);
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
}

async function handleAddItem(event) {
  event.preventDefault();
  if(!newItemName.trim() || !newItemDescription.trim()){
    alert('Por favor, preencha todos os campos.')
    return;
  }
  try {
    setIsSubmitting(true);
    const {error} = await supabase
    .from('items')
    .insert([{name: newItemName, description: newItemDescription}]);
    if(error){
      throw error;
    }
    setNewItemName('');
    setNewItemDescription('');
    getItems();
  } catch (error){
    setError(error.message);
  }finally {
    setIsSubmitting(false);
}


}

  return (
    <div>

    </div>
  )
}

export default App