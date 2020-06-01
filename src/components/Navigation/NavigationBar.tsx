import React, { FC } from 'react'

const NavigationBar: FC = ({ children }) => (
  <nav className="level">
    {children}
  </nav>
)

export default NavigationBar;
