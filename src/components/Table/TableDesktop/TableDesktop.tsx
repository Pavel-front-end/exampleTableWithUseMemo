import React from 'react';
import {HeaderGroup, Row } from 'react-table';

import classes from '../Table.module.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown, faAngleUp, faPen} from "@fortawesome/free-solid-svg-icons";
import {IGiftChallengeUserStatusEnum} from "../../../helpers/Interfaces/GiftChallenges/IGiftChallenge";

interface IPropsTableDesktop {
    columns: any,
    data: any[],
    page: any[],
    noDataText: string,
    getTableProps: () => void
    getTableBodyProps: () => void
    prepareRow: (row: Row<{}>) => void
    headerGroups: HeaderGroup[]
    type?: string
    showWinner?: boolean
}

const TableDesktop: React.FC<IPropsTableDesktop> = (props) => {

    return (
        <div className={props.type ? classes[`${props.type}`] : classes.TableWrapper}>
            <table className={classes.TableDesktop} {...props.getTableProps()}>
                <thead className={classes.TableHeader}>
                {props.headerGroups.map((headerGroup: HeaderGroup<any>) => (
                    // @ts-ignore
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column: any) => (
                            <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                {column.render('Header')}
                                <span>{' '}
                                    {column.isSorted
                                        ? (column.isSortedDesc
                                            ? <FontAwesomeIcon icon={faAngleDown}/>
                                            : <FontAwesomeIcon icon={faAngleUp}/>)
                                        : ''}
                                </span>
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...props.getTableBodyProps()}>
                {props.page.length
                    ? (
                        props.page.map((row: Row<any>, i: number) => {
                            props.prepareRow(row)
                            // return props.showWinner && row.original.status === IGiftChallengeUserStatusEnum.winner
                            //     ?
                            //         <div className={classes.TableCustomRowWrapper} {...row.getRowProps()}>
                            //             {row.cells.map((cell) => {
                            //                 return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            //             })}
                            //         </div>
                            //     :
                            //         <tr {...row.getRowProps()}>
                            //             {row.cells.map((cell) => {
                            //                 return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            //             })}
                            //         </tr>
                            return <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        })
                    )
                    : <tr>
                        <td colSpan={10} className={classes.TableNoRequests}>
                            <FontAwesomeIcon
                                icon={faPen}/> {props.noDataText}
                        </td>
                    </tr>
                }
                </tbody>
            </table>
        </div>
    )
};

export default TableDesktop;
