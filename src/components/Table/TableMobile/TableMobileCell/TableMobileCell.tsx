import React from 'react';
import classes from './TableMobileCell.module.scss';
import {Cell} from "react-table";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";

interface IPropsTableMobileCell {
    row: any,
    buttonsCell?: string[]
}

const TableMobileCell: React.FC<IPropsTableMobileCell> = (props) => {

    return (
        <div
            className={classes.TableMobileDataItem}
            {...props.row.getRowProps()}>

            {props.row.cells.map((cell: Cell, index:number) => {
                    return !props.buttonsCell?.includes(cell.column.id)
                        ? (
                            // @ts-ignore
                            <div
                                // key={index*5.5 + cell.row.id}
                                className={classes.TableMobileDataRow}
                                {...cell.getCellProps()}>
                                <div className={classes.TableMobileItemHeader}>
                                    {cell.column.Header}
                                </div>
                                <div className={classes.TableMobileItemValue}>
                                    {cell.render('Cell')}
                                </div>
                            </div>
                        ) : null
                }
            )}
            <div className={classes.TableMobileButtons}>
                {props.buttonsCell?.map((item, index1:number) => {
                    return (
                        <div
                            key={index1*3.3}>
                            {props.row.cells.map((cellItem: Cell, index2: number) => {
                                return (
                                    cellItem.column.id === item
                                        ? <div key={index2*2.2}>{cellItem.render('Cell')}</div>
                                        : null
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        </div>
    )


};

export default TableMobileCell;
