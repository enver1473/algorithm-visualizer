import React from 'react';
import { Card } from 'antd';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  width: 100%;
`;

const Version = ({ title, content, ...props }) => {
  return (
    <StyledCard title={'Version ' + title} {...props}>
      {title === '1.0' ? (
        <h3>App features:</h3>
      ) : null}
        <ul>
          {content.map((detail) => (
            <li>{detail}</li>
          ))}
        </ul>
    </StyledCard>
  );
};

export default Version;
