import React, { FC } from 'react';
import { Link, LinkProps } from "react-router-dom";

const NavigationLink: FC<LinkProps> = ({ children, className, ...props }) => (
  <Link  {...props} className={`level-item has-text-centered is-size-4 ${className}`}>{children}</Link>
)

export default NavigationLink
