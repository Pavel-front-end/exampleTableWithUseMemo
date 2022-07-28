import React, {useCallback, useEffect, useState} from 'react';
import classes from './CaseManagement.module.scss';
import Table from "../Table/Table";
import {
    DateCell,
    DeleteCaseCell,
    EditCaseCell,
    LocationAddressCell,
    StatusCell,
    TotalPacksAmount
} from "../TableCells/TableCells";
import {connect} from "react-redux";
import {AppActions} from "../../store/actions/types/actions";
import {ThunkDispatch} from "redux-thunk";
import {bindActionCreators} from "redux";
import {fetchCases, resetCase} from "../../store/actions/garbageActions/garbage";
import {IGarbage, TableQueryParams} from "../../helpers/Interfaces/Garbage/IGarbage.interface";
import {AppState} from "../../store/store";
import {CaseStatusEnum, GarbageCase} from '../../helpers/Types';
import appConst from "../../config/consts";

type Props = ILinkDispatchProps & ILinkStateProps

const { ITEMS_ON_PAGE } = appConst

const CaseManagement: React.FC<Props> = (props) => {

    const { fetchCases } = props

    const [searchParams, setSearchParams] = useState<TableQueryParams>({status: [CaseStatusEnum.current], limit: 10})

    const [pagesCount, setPagesCount] = React.useState(0)

    const [tableData, setTableData] = useState<GarbageCase[]>([])

    useEffect(() => {
        setTableData(props.garbage.fetchedCases.cases)
    }, [props.garbage.fetchedCases.cases])

    useEffect(() => {
        const pages = Math.ceil(
            props.garbage.fetchedCases.count / ITEMS_ON_PAGE
        );
        setPagesCount(pages);
    }, [props.garbage.fetchedCases.count])

    useEffect(() => {
        fetchCases(searchParams);
        setTableData(props.garbage.fetchedCases.cases)
    }, [fetchCases, searchParams]);

    const handlePagination = useCallback((offset: number) => {
        setSearchParams((prevState) => {
            return {
                ...prevState,
                offset,
            }
        })
    }, [])


    const columns = React.useMemo(
        () => [
            {
                Header: 'Date & time',
                accessor: 'createdAt',
                Cell: DateCell
            },
            {
                Header: 'Location',
                accessor: 'address',
                Cell: LocationAddressCell
            },
            {
                Header: 'Total amount of packs',
                accessor: 'totalPacksAmount',
                Cell: TotalPacksAmount
            },
            {
                Header: '',
                accessor: 'status',
                Cell: StatusCell,
            },
            {
                Header: '',
                accessor: 'id',
                id: 'caseEditId',
                Cell: EditCaseCell,
                disableSortBy: true,
                disableFilter: true,
            },
            {
                Header: '',
                accessor: 'id',
                id: 'caseDeleteId',
                Cell: DeleteCaseCell,
                disableSortBy: true,
                disableFilter: true,
            },
        ],
        []
    );
    const buttonsCell = ['id'];

    return (
        <div className={classes.CaseManagement}>
            <div className={classes.NewCase}>
                <h4>New case</h4>
            </div>
            <div className={classes.SavedCases}>
                <h4>Saved cases</h4>
                <Table
                    pagesCount={pagesCount}
                    buttonsCell={buttonsCell}
                    type='SavedCasesTable'
                    columns={columns}
                    data={tableData}
                    noDataText='You haven’t created any cases yet'
                    handlePagination={handlePagination}
                />
            </div>
        </div>
    )
};

interface ILinkStateProps {
    garbage: IGarbage
}

interface ILinkDispatchProps {
    fetchCases: (searchParams?: TableQueryParams) => void;
    resetCase: () => void;
}

const mapStateToProps = (state: AppState): ILinkStateProps => {
    return {
        garbage: state.garbage
    }
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>): ILinkDispatchProps => ({
    fetchCases: bindActionCreators(fetchCases, dispatch),
    resetCase: bindActionCreators(resetCase, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CaseManagement);
