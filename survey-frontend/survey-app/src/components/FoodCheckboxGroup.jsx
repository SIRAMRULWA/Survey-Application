import React from 'react';

export default function FoodCheckboxGroup({ form, handleChange, error }) {
  const foodOptions = [
    { key: 'Pizza', name: 'likesPizza', label: 'Pizza' },
    { key: 'Pasta', name: 'likesPasta', label: 'Pasta' },
    { key: 'PapAndWors', name: 'likesPapAndWors', label: 'Pap and Wors' },
    { key: 'OtherFood', name: 'likesOtherFood', label: 'Other Food' }
  ];

  return (
    <>
      <tr>
        <th scope="row" className="align-middle">Favorite Foods</th>
        {foodOptions.map(food => (
          <td key={food.key} className="text-center align-middle">
            <input
              type="checkbox"
              id={food.name}
              name={food.name}
              checked={form[food.name]}
              onChange={handleChange}
            />
            <label htmlFor={food.name} className="ms-1">{food.label}</label>
          </td>
        ))}
        <td></td>
      </tr>
      {error && (
        <tr>
          <td colSpan={foodOptions.length + 2} className="text-danger small">
            {error}
          </td>
        </tr>
      )}
    </>
  );
}