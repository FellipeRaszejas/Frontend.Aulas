function Header({ onHelp }) {
  return (
    <header className="header">

      <div className="header-left" />

      <h1 className="logo">
        TERMO
      </h1>

      <div className="header-right">

        <button
          className="help-button"
          onClick={onHelp}
          aria-label="Como jogar"
        >
          ?
        </button>

      </div>

    </header>
  );
}

export default Header;