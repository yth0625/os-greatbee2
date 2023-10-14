import React from "react";

import { Tree, TreeNode } from 'react-organizational-chart';
import styled from '@emotion/styled';

type chartData = {
    name: string;
    child: chartData[];
}

type IProps = {
    data: chartData;
    isRoot: boolean;
    depth: number;
  };

const colors = ['#FFC73C', '#ADADAD', '#FFEDC5', '#F1F1F1']

const OrganizationChart = ({data, isRoot, depth}: IProps) => {
    const renderNode = (data: any) => {
        return (
            <StyledNode>
                <StyledNodeTop color={colors[depth % 4]}>
                    {data.name}
                </StyledNodeTop>
                <StyledNodeBottom>

                </StyledNodeBottom>
            </StyledNode>
                
        )
    }

    if(isRoot){
        return (
            <Tree 
                label={renderNode(data)}
                lineWidth={'3px'}
                lineColor={'#CCC'}
                lineBorderRadius={'10px'}
            >
                {
                    data.child.map((child)=>{
                        return(
                            // <TreeNode label={<div>{child.name}</div>}></TreeNode>
                            <OrganizationChart data={child} isRoot={false} depth={depth+1}/>
                        )
                    })
                }
            </Tree>
        )
    }
    else return (
        <TreeNode 
            label={renderNode(data)}
        >
            {
                data.child.map((child)=>{
                    return(
                        // <TreeNode label={<div>{child.name}</div>}></TreeNode>
                        <OrganizationChart data={child} isRoot={false} depth={depth+1}/>
                    )
                })
            }
        </TreeNode>
    )
};

const StyledNode = styled.div`
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
`
const StyledNodeTop = styled.div`
display: flex;
width: 100%;
// height: 39px;
padding: 24px;
justify-content: center;
align-items: center;
gap: 10px;

border-radius: 16px 16px 0px 0px;
border-top: 2px solid #CCC;
border-right: 2px solid #CCC;
border-left: 2px solid #CCC;
background: ${props => props.color};
`

const StyledNodeBottom = styled.div`
display: flex;
width: 100%;
// height: 39px;
padding: 24px;
justify-content: center;
align-items: center;
gap: 10px;

border-radius: 0px 0px 16px 16px;
border: 2px solid #CCC;
background: #FFF;
`

export default OrganizationChart;
