import React, { FC, memo } from 'react';
import styled from 'styled-components';

interface CardImageProps {
    readonly code: string;
    readonly imageUrl: string;
}

const CardImageStyled = styled.img`
    height: 84px;
    width: 60px;
    margin: 1px;
`;

export const CardImage: FC<CardImageProps> = memo(function CardImageComponent({
    code,
    imageUrl,
}) {
    return (
        <CardImageStyled key={code} src={imageUrl} alt={code} />
    );
})