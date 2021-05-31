import React,{FC,useState} from 'react';
import styles from './SearchForm.module.scss';

const SearchForm = () => {
  const [text, setText] = useState<string>('');
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <input 
          className={styles.input}
          value={text}
          placeholder='search keyword'
          onChange={({target:{value}})=>setText(value)}
          type="text"
        />
        <img className={styles.icon} src='/iconfinder_search_172546.png' alt='search-icon' />
      </div>
    </div>
  )
}

export default SearchForm
