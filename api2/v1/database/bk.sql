--
-- PostgreSQL database dump
--

-- Dumped from database version 14.8 (Ubuntu 14.8-0ubuntu0.22.10.1)
-- Dumped by pg_dump version 14.7

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_table_access_method = heap;

--
-- Name: location; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.location (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    postcode character varying(10),
    address character varying(100),
    is_active boolean DEFAULT true NOT NULL
);


--
-- Name: location_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.location_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: location_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.location_id_seq OWNED BY public.location.id;


--
-- Name: match; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.match (
    id integer NOT NULL,
    datetime timestamp with time zone NOT NULL,
    "teamA_name" character varying(100) NOT NULL,
    "teamB_name" character varying(100) NOT NULL,
    "teamA_score" integer,
    "teamB_score" integer,
    location_id integer NOT NULL,
    mvp_id integer
);


--
-- Name: match_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.match_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: match_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.match_id_seq OWNED BY public.match.id;


--
-- Name: player; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.player (
    id integer NOT NULL,
    firstname character varying(50) NOT NULL,
    lastname character varying(50) NOT NULL,
    telephone character varying(30),
    country_code character varying(3),
    photo bytea,
    is_active boolean DEFAULT true NOT NULL
);


--
-- Name: player_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.player_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: player_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.player_id_seq OWNED BY public.player.id;


--
-- Name: player_match; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.player_match (
    player_id integer NOT NULL,
    match_id integer NOT NULL,
    team character varying(1),
    pichichi boolean DEFAULT false NOT NULL
);


--
-- Name: user; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    email character varying(100) NOT NULL,
    hashed_password character varying(100) NOT NULL,
    is_active boolean DEFAULT true NOT NULL
);


--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: location id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.location ALTER COLUMN id SET DEFAULT nextval('public.location_id_seq'::regclass);


--
-- Name: match id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.match ALTER COLUMN id SET DEFAULT nextval('public.match_id_seq'::regclass);


--
-- Name: player id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.player ALTER COLUMN id SET DEFAULT nextval('public.player_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Data for Name: location; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.location (id, name, postcode, address, is_active) FROM stdin;
1       Sportal Zeeburg                 t
\.


--
-- Data for Name: match; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.match (id, datetime, "teamA_name", "teamB_name", "teamA_score", "teamB_score", location_id, mvp_id) FROM stdin;
5       2023-05-15 10:51:00+02  no idea eeee    3       3       1       3
6       2023-07-26 00:00:00+02  3223    333     0       0       1       \N
7       2023-07-26 00:00:00+02  3232    3223    0       0       1       \N
8       2023-07-26 00:00:00+02  3232    3223    0       0       1       \N
2       2023-05-01 14:47:00+02  string  string  1       0       1       \N
9       2023-07-28 00:00:00+02  2332    32323   3       3       1       2
10      2023-08-02 00:00:00+02  hhj     kjhjkh  0       0       1       \N
\.


--
-- Data for Name: player; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.player (id, firstname, lastname, telephone, country_code, photo, is_active) FROM stdin;
1       Ruben   Sanchez \N      PER     \N      t
2       Anthony Ren     \N      BEL     \N      t
3       Gustavo Otero   \N      VEN     \N      t
4       Anderson        Muller  \N      BRA     \N      t
5       Marco   Burelli \N      ITA     \N      t
6       Jorge   Fernandez       \N      ESP     \N      t
7       Luke    Mc Donic        \N      GBR     \N      t
8       Luke    Monty   \N      GBR     \N      t
9       Mark Hann       Burelli \N      GBR     \N      t
10      Alex    Valente \N      PRT     \N      t
11      Can     Öztürk  \N      TUR     \N      t
12      Hector  Gabriel \N      VEN     \N      t
\.


--
-- Data for Name: player_match; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.player_match (player_id, match_id, team, pichichi) FROM stdin;
1       2       A       f
3       2       B       f
3       5       A       t
2       5       A       t
5       5       B       t
4       5       B       f
2       6       A       f
1       6       B       f
2       7       A       f
1       7       B       f
2       8       A       f
1       8       B       f
2       9       A       t
4       9       A       f
3       9       B       f
5       9       B       f
1       10      A       f
2       10      B       f
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."user" (id, email, hashed_password, is_active) FROM stdin;
\.


--
-- Name: location_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.location_id_seq', 1, true);


--
-- Name: match_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.match_id_seq', 10, true);


--
-- Name: player_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.player_id_seq', 12, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.user_id_seq', 1, false);


--
-- PostgreSQL database dump complete
--

