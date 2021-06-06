import React,{FC} from 'react';
import Autocomplete from 'react-autocomplete'
import styles from './SearchForm.module.scss';

const SearchForm:FC<IProps> = ({searchText,handleSearch,searchOptions=[]}:IProps) => 
  <div className={styles.container}>
    <div className={styles.form}>
      <Autocomplete
        getItemValue={(item) => item}
        items={searchOptions}
        renderItem={(item, isHighlighted) =>
          <div key={item} style={{ background: isHighlighted ? 'lightgray' : 'white' ,width:'100%'}}>
            {item}
          </div>
        }
        value={searchText}
        onChange={({target:{value}}) => handleSearch(value)}
        onSelect={(value) => handleSearch(value)}
        inputProps={{className:styles.input}}
        wrapperProps={{className: styles.wrapper}}
      />
      <img className={styles.icon} src='/iconfinder_search_172546.png' alt='search-icon' />
    </div>
  </div>


export default SearchForm;

interface IProps {
  searchText: string,
  handleSearch: (text:string) => void,
  searchOptions?: string[]
}
