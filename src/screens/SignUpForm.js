import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Controller, useForm } from 'react-hook-form'
import MouseOverPopover from '../components/MouseOverPopover';

const theme = createTheme();

const SignUpForm = ({
    onSubmit = async (data) => alert(JSON.stringify(data))
}) => {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: '',
      password: '',
      agreeToTerms: false
    }
  })

  const termsChecked = watch('agreeToTerms')
  const checkboxLabel = <MouseOverPopover />

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign Up
          </Typography>
          <Box component='form' noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='email'
                  label='Email'
                  name='email'
                  error={!!errors?.email}
                  helperText={errors?.email ? errors.email.message : null}
                  {...register('email', { required: "Email is required" })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='new-password'
                  error={!!errors?.password}
                  helperText={errors?.password ? errors.password.message : null}
                  {...register('password', { required: "Password is required" })}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel 
                  control={
                    <Controller
                      name='agreeToTerms'
                      control={control}
                      defaultValue={false}
                      render={({ field: { value, ref, ...field } }) => (
                        <Checkbox
                          {...field}
                          required
                          inputRef={ref}
                          checked={!!value}
                          color="primary"
                          size={"medium"}
                          disableRipple
                        />
                      )}
                    />
                  }
                  label={checkboxLabel}
                />
              </Grid>
            </Grid>
            <Button
              disabled={!termsChecked}
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignUpForm;