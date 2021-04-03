import React from "react";
import { Row, Col, Card } from "antd";
import styled from "styled-components";

const StyledCard = styled(Card)`
  width: 100%;
  box-shadow: 0 0 14px 1px rgba(0, 0, 0, 0.21);
  border-radius: 3px;
  border: none;
  border-left: 0.4rem solid #008aff;
`;

const StyledRow = styled(Row)`
  justify-content: space-between;
`;

const ColRight = styled(Col)`
  font-size: 0.9rem;
  color: rgba(0, 0, 0, 0.5);
`;

const Version = ({ data }) => {
  const { title, content, date, firstRelease } = data;
  return (
    <StyledCard
      headStyle={{ borderBottom: "2px solid rgba(0, 0, 0, 0.1)" }}
      bodyStyle={{ backgroundColor: "hsl(0, 0%, 97%)" }}
      title={
        <StyledRow>
          <Col>{`Version ${title}`}</Col>
          <ColRight>{date}</ColRight>
        </StyledRow>
      }
    >
      {firstRelease && <h3>App features:</h3>}
      <ul>
        {content.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </StyledCard>
  );
};

export default Version;
