import React from 'react';

import classes from "../Table.module.scss";
import {
    Row,
    HeaderGroup,
} from "react-table";
import TableMobileCell from "./TableMobileCell/TableMobileCell";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen} from "@fortawesome/free-solid-svg-icons";

interface IPropsTableMobile {
    columns: any,
    data: any[],
    page: any[],
    noDataText: string,
    getTableProps: () => void
    getTableBodyProps: () => void
    prepareRow: (row: Row<{}>) => void
    headerGroups: HeaderGroup[]
    buttonsCell?: string[]
}

type Props = IPropsTableMobile
const TableMobile: React.FC<Props> = (props) => {

    return (
        <div className={classes.TableMobile}>
            <div {...props.getTableBodyProps} className={classes.TableMobileData}>
                {props.page.length
                    ? (
                        props.page.map((row: Row<{}>, i: number) => {
                            props.prepareRow(row);
                            return (
                                <TableMobileCell key={Math.random() + i}
                                                 buttonsCell={props.buttonsCell} row={row}/>
                            )
                        })
                    )
                    : <div>
                        <div className={classes.TableNoRequests}>
                            <FontAwesomeIcon
                                icon={faPen}/> {props.noDataText}
                        </div>
                    </div>
                }
            </div>
        </div>
    )
};

export default TableMobile;