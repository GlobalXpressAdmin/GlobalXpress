'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Divider,
  TextField,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Alert,
  Stack,
} from '@mui/material';
import WhatsappButton from '@/components/WhatsappButton';

const ComunicacionPage = () => {
  const { data: session } = useSession();
  const [asunto, setAsunto] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const usuario_email = session?.user?.email;
  const usuario_nombre = session?.user?.nombre || 'Usuario';

  const fetchHistorial = async () => {
    if (!usuario_email) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/comunicacion?email=${usuario_email}`);
      const data = await res.json();
      if (data.ok) {
        setHistorial(data.comunicaciones);
      } else {
        setError(data.error || 'Error al cargar la conversación.');
      }
    } catch (e) {
      setError('Error de red al cargar la conversación.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistorial();
    // eslint-disable-next-line
  }, [usuario_email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch('/api/comunicacion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ asunto, mensaje, email: usuario_email }),
      });
      const data = await res.json();
      if (data.ok) {
        setSuccess('Mensaje enviado correctamente.');
        setAsunto('');
        setMensaje('');
        fetchHistorial();
      } else {
        setError(data.error || 'Error al enviar el mensaje.');
      }
    } catch (e) {
      setError('Error de red al enviar el mensaje.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom align="center">
        Conversación
      </Typography>
      <Typography variant="subtitle1" align="center" color="text.secondary" gutterBottom>
        Envía tus dudas, solicitudes o comentarios. Nuestro equipo te responderá lo antes posible.
      </Typography>
      <Box component={Paper} elevation={3} sx={{ p: 4, mb: 6, borderRadius: 3 }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              label="Asunto"
              value={asunto}
              onChange={e => setAsunto(e.target.value)}
              required
              fullWidth
              variant="outlined"
            />
            <TextField
              label="Mensaje"
              value={mensaje}
              onChange={e => setMensaje(e.target.value)}
              required
              fullWidth
              multiline
              minRows={4}
              variant="outlined"
            />
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={enviando || !asunto || !mensaje}
              sx={{ borderRadius: 2, fontWeight: 600 }}
            >
              {enviando ? <CircularProgress size={24} /> : 'Enviar Mensaje'}
            </Button>
          </Stack>
        </form>
      </Box>
      <Card elevation={2} sx={{ borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Conversación
          </Typography>
          {loading ? (
            <Box display="flex" justifyContent="center" py={4}>
              <CircularProgress />
            </Box>
          ) : historial.length === 0 ? (
            <Typography color="text.secondary">No hay mensajes enviados aún.</Typography>
          ) : (
            <List
              sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: 2 }}
              subheader={<ListSubheader>Mensajes enviados</ListSubheader>}
            >
              {historial.map((com: { id: string; asunto: string; creado_en: string; mensaje: string; respuestas?: { id: string; autor: string; creado_en: string; mensaje: string }[] }) => (
                <Box key={com.id} mb={2}>
                  <ListItem alignItems="flex-start" sx={{ background: '#f7f7fa', borderRadius: 2, mb: 1 }}>
                    <ListItemText
                      primary={
                        <>
                          <Typography fontWeight={700} component="span">{com.asunto}</Typography>
                          <Typography variant="caption" color="text.secondary" component="span">
                            {new Date(com.creado_en).toLocaleString()}
                          </Typography>
                        </>
                      }
                      secondary={
                        <Box component="span">
                          <Typography component="span">{com.mensaje}</Typography>
                          <Divider sx={{ my: 1 }} component="span" />
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }} component="span">
                            El equipo de soporte responderá a tu mensaje lo más pronto posible.
                          </Typography>
                          {com.respuestas && com.respuestas.length > 0 && (
                            <Box mt={1} component="span">
                              <Typography variant="subtitle2" color="primary" fontWeight={600} component="span">
                                Respuestas del equipo:
                              </Typography>
                              {com.respuestas.map((resp: { id: string; autor: string; creado_en: string; mensaje: string }) => (
                                <Paper key={resp.id} sx={{ p: 2, my: 1, background: '#e3f2fd' }} component="span">
                                  <Typography variant="body2" color="text.secondary" component="span">
                                    {resp.autor === 'ADMIN' ? 'Soporte' : 'Tú'} - {new Date(resp.creado_en).toLocaleString()}
                                  </Typography>
                                  <Typography component="span">{resp.mensaje}</Typography>
                                </Paper>
                              ))}
                            </Box>
                          )}
                        </Box>
                      }
                    />
                  </ListItem>
                </Box>
              ))}
            </List>
          )}
        </CardContent>
      </Card>
      <WhatsappButton />
    </Container>
  );
};

export default ComunicacionPage; 