import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";

import Filter from "../Filter";

import "./History.scss";

const History = (props) => {
  const items = props.state.isFilter
    ? props.state.transFiltered
    : props.state.transactions;

  return (
    <>
      <div className="history__title">History Transaction</div>
      <Paper className={"card history"}>
        <Filter />
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Date/Time</TableCell>
              <TableCell align="right" sortDirection={"desc"}>
                Name
              </TableCell>
              <TableCell align="right">
                <TableSortLabel direction={"asc"}>
                  Transaction amount
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">Resulting balance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell component="th" scope="row">
                  {item.date}
                </TableCell>
                <TableCell align="right">{item.username}</TableCell>
                <TableCell align="right">
                  <span
                    className={`${+item.amount < 0 ? "negative-value" : ""}${
                      +item.amount > 0 ? "positive-value" : ""
                    }`}
                  >
                    {item.amount}
                  </span>
                </TableCell>
                <TableCell align="right">{item.balance}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
};

export default connect((state) => ({ state }))(History);
