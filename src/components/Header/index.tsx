import './Header.css'

const Header = ({appTitle = 'header'}) => {
  return <header data-testid='header' className="Header"><h1 className='LogoMark'>{appTitle}</h1></header>
};

export default Header;