import { Box, Button, Container, List, ListItem, MenuItem, Select, TextField, Typography } from "@material-ui/core";
import { useBindable } from "bindable-bloc";
import React, { useEffect } from "react";
import SearchViewState from "../blocs/states/SearchViewState";
import SearchViewBloc from "../blocs/ui/SearchViewBloc";
import FlexBox from "../components/FlexBox";
import TitleHeader from "../components/TitleHeader";
import useBloc from "../libs/useBloc";
import Utils from "../libs/Utils";
import ItemSortType from "../models/ItemSortType";
import SortDirection from "../models/SortDirection";

export default function SearchView() {

    const bloc = useBloc(SearchViewBloc);
    const state = useBloc(SearchViewState);

    const searchValue = useBindable(state.searchValue);
    const results = useBindable(state.results);
    const itemSortType = useBindable(state.itemSortType);
    const sortDirection = useBindable(state.sortDirection);

    useEffect(() => {
        bloc.initState();
    }, []); // eslint-disable-line

    const onSearchValueChange = (e: any) => bloc.setSearchValue(e.target.value);

    const onItemSortTypeChange = (e: any) => bloc.setItemSort(e.target.value);

    const onSortDirectionChange = (e: any) => bloc.setSortDirection(e.target.value);

    const onSearchButton = () => bloc.search();
    
    return (
        <Box>
            <TitleHeader
                title="Search prices"
            />
            <Container>
                <FlexBox flexDirection="row" alignItems="center">
                    <TextField
                        fullWidth
                        value={searchValue}
                        onChange={onSearchValueChange}
                        placeholder="Enter SKU value"
                    />
                    <Box width={10} />
                    <Button onClick={onSearchButton}>
                        Search
                    </Button>
                </FlexBox>

                <Box height={10} />

                <FlexBox flexDirection="row" alignItems="center">
                    <Typography>Sort by:</Typography>
                    <Box width={10}/>
                    <Select value={itemSortType} onChange={onItemSortTypeChange}>
                        <MenuItem value={ItemSortType.Price}>Price</MenuItem>
                        <MenuItem value={ItemSortType.Date}>Date</MenuItem>
                    </Select>

                    <Box width={30} />

                    <Typography>Direction:</Typography>
                    <Box width={10}/>
                    <Select value={sortDirection} onChange={onSortDirectionChange}>
                        <MenuItem value={SortDirection.Ascending}>Ascending</MenuItem>
                        <MenuItem value={SortDirection.Descending}>Descending</MenuItem>
                    </Select>
                </FlexBox>
                
                <Box height={20} />

                <List>
                    {
                        results.map((r) => {
                            const finalPrice = r.basePrice * (1 - r.discountRate);
                            const onHistoryButton = () => bloc.showHistory(r);

                            return (
                                <ListItem key={`${r.sku}${r.timestamp}`} divider>
                                    <FlexBox flexDirection="column" alignItems="flex-start">
                                        <Typography variant="h6">{r.sku}</Typography>
                                        <Typography style={{
                                            fontSize: 12
                                        }}>
                                            By {r.userAddress}
                                        </Typography>
                                        <Typography style={{
                                            fontSize: 12
                                        }}>
                                            {new Date(r.timestamp).toISOString()}
                                        </Typography>
                                    </FlexBox>
                                    <Box flex={1} />
                                    <FlexBox flexDirection="column" alignItems="flex-end">
                                        <Typography variant="h6">${finalPrice}</Typography>
                                        <Typography style={{
                                            fontSize: 12
                                        }}>
                                            Original price: ${r.basePrice}
                                        </Typography>
                                        <Typography style={{
                                            fontSize: 12
                                        }}>
                                            Discount: {Utils.getPercent(r.discountRate)}
                                        </Typography>
                                    </FlexBox>
                                    <Box width={20}/>
                                    <Button onClick={onHistoryButton}>
                                        History
                                    </Button>
                                </ListItem>
                            );
                        })
                    }
                </List>
            </Container>
        </Box>
    );
}