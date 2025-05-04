import './Header.css'

const Header = ({appTitle = 'Tiller'}) => {
  return <header className='Header'>
    <h1 className='App-Title'>{appTitle}</h1>
  </header>
}

export default Header;
