import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Grid,
  InputAdornment,
  Paper,
  TextField,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import {
  PaymentRounded,
  SendSharp,
  MonetizationOnRounded,
  ShoppingBasketSharp,
} from "@material-ui/icons";
import { styles, paperStyle } from "../styles";
import { IMembresia } from "../../models/Membresia";
import * as servicesMember from "../../services/MembresiaService";

type InputChange = ChangeEvent<HTMLInputElement>;
export const BuyMembresia = () => {
  const clasess = styles();
  const initialSelected = {
    membresiaID: 0,
    priceMember: "0.00",
    cardNumber: "",
  };
  const [selected, setSelected] = useState(initialSelected);
  const [memberList, setMemberList] = useState<IMembresia[]>([]);
  useEffect(() => {
    setListData();
  }, []);
  const setListData = async () => {
    const res = await servicesMember.getMembers();
    if (res.data) {
      const tempList = res.data.map((member) => {
        return {
          ...member,
        };
      });
      setMemberList(tempList);
    }
  };
  const handleInputChange = (e: InputChange) => {
    setSelected({
      ...selected,
      [e.target.name]: e.target.value,
    });
  };
  const comboBoxChange = (event: any, newValue: IMembresia | null) => {
    /* selected.priceMember = newValue ? `${newValue.Precio.toString()}.00`  : "0.00" */
    setSelected({
      ...selected,
      priceMember: newValue ? `${newValue.Precio.toString()}.00` : "0.00",
      membresiaID: newValue ? newValue.ID : 0,
    });
    //console.log(selected)
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(selected);
  };
  return (
    <div className={clasess.content}>
      <form onSubmit={handleSubmit}>
        <Grid>
          <Paper elevation={10} style={paperStyle}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Avatar variant="rounded" className={clasess.rounded}>
                <ShoppingBasketSharp fontSize="large" />
              </Avatar>
              <h2>Comprar</h2>
            </Grid>
            <div style={{paddingTop:50}}>
            <Autocomplete
              id="combo-box-demo"
              options={memberList}
              getOptionLabel={(option) => option.Nombre}
              fullWidth
              onChange={comboBoxChange}
              renderInput={(params) => (
                <TextField {...params} label="Membresia" variant="outlined" />
              )}
            />
            </div>
            <div style={{paddingTop:20}}>
            <TextField
              label="Precio"
              type="text"
              margin="normal"
              fullWidth
              disabled
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {" "}
                    <MonetizationOnRounded />{" "}
                  </InputAdornment>
                ),
              }}
              name="priceMember"
              value={selected.priceMember}
              onChange={handleInputChange}
              variant="outlined"
            />
            </div>
            <div style={{paddingTop:20}}>
            <TextField
              label="Numero de Tarjeta"
              type="password"
              margin="normal"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {" "}
                    <PaymentRounded />{" "}
                  </InputAdornment>
                ),
              }}
              name="cardNumber"
              onChange={handleInputChange}
              value={selected.cardNumber}
              required
              variant="outlined"
            />
            </div>
            <div style={{paddingTop:20}}>
            <Button
              type="submit"
              color="secondary"
              variant="outlined"
              fullWidth
              style={{ margin: 8 }}
              startIcon={<SendSharp />}
            >
              Confirmar
            </Button>
            </div>
          </Paper>
        </Grid>
      </form>
    </div>
  );
};
